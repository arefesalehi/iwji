'use client'

import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import 'react-tabs/style/react-tabs.css'

const t = (label) => label

export default function CourseTable({ columns, courseRegistrations }) {
  const [rows, setRows] = useState(courseRegistrations || [])
  const [activeTab, setActiveTab] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [columnGroups, setColumnGroups] = useState([])
  const [pageByTab, setPageByTab] = useState({}) // 👈 نگهداری شماره صفحه برای هر تب

  useEffect(() => {
    setRows(courseRegistrations || [])
    setPageByTab({}) // وقتی داده عوض شد، صفحه‌ها ریست بشه
  }, [courseRegistrations])

  useEffect(() => {
    setColumnGroups(columns || [])
  }, [columns])

  const handleInputChange = (id, key, value) => {
    setRows((prev) =>
      prev.map((r) => (r._id === id ? { ...r, [key]: value } : r)),
    )
  }

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = Number(e.target.value)
    setRowsPerPage(newRowsPerPage)
    setPageByTab((prev) => ({
      ...prev,
      [activeTab]: 1, // وقتی سایز تغییر کرد، تب جاری برگرده صفحه ۱
    }))
  }

  const getFieldValue = (row, fieldId) => {
    if (
      row[fieldId] !== undefined &&
      row[fieldId] !== null &&
      row[fieldId] !== ''
    )
      return row[fieldId]

    const raw = row.__raw || {}
    const mapFallbacks = {
      firstName: () => raw.userId?.name?.split(' ')[0] ?? '',
      lastName: () => {
        const parts = raw.userId?.name?.split(' ') || []
        return parts.length > 1 ? parts.slice(1).join(' ') : ''
      },
      email: () => raw.userId?.email ?? '',
      phoneNumber: () => row.phoneNumber || raw.userId?.phone || '',
      courseName: () => raw.courseId?.name ?? '',
      personalPhoto: () => row.personalPhoto || raw.personalPhoto,
      birthCertificateImage: () =>
        row.birthCertificateImage || raw.birthCertificateImage,
      passportImage: () => row.passportImage || raw.passportImage,
      otherDocuments: () => row.otherDocuments || raw.otherDocuments,
    }
    if (mapFallbacks[fieldId]) return mapFallbacks[fieldId]()

    const nestedTry = (obj, path) =>
      path
        .split('.')
        .reduce((a, b) => (a && a[b] !== undefined ? a[b] : undefined), obj)
    const candidates = [
      `userId.${fieldId}`,
      `courseId.${fieldId}`,
      `__raw.${fieldId}`,
    ]
    for (const c of candidates) {
      const val = nestedTry(row, c)
      if (val !== undefined) return val
    }

    return ''
  }

  const normalizeImageSrc = (val) => {
    if (!val || typeof val !== 'string') return null
    if (val.startsWith('http://') || val.startsWith('https://')) return val
    const base =
      typeof window !== 'undefined'
        ? process.env.NEXT_PUBLIC_API_URL || window.location.origin
        : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    if (val.startsWith('/')) return `${base}${val}`
    return `${base}/${val}`
  }

  const triggerDownload = (url, filename) => {
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    if (filename) a.download = filename
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const renderTable = (columnsGroup, tabIndex) => {
    const currentPage = pageByTab[tabIndex] || 1
    const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const indexOfLastRow = safeCurrentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)

    const handlePageChange = (newPage) => {
      setPageByTab((prev) => ({
        ...prev,
        [tabIndex]: Math.max(1, Math.min(newPage, totalPages)),
      }))
    }

    return (
      <div className="shadow-sm border border-gray-200 rounded-lg overflow-x-auto">
        <table className="divide-y divide-gray-200 min-w-full">
          <thead className="bg-red-800 cursor-pointer">
            <tr>
              {columnsGroup.map((col) => (
                <th
                  key={col.id}
                  className="px-4 py-3 font-medium text-white text-xs text-center uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {t(col.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                {columnsGroup.map((col) => (
                  <td
                    key={col.id}
                    className={`px-4 text-center align-middle py-3 text-sm text-gray-700 ${
                      ['icon', 'status-circle', 'actions', 'badge'].includes(
                        col.type,
                      )
                        ? 'flex justify-center items-center mt-5'
                        : ''
                    }`}
                  >
                    {col.type === 'text' &&
                      (col.editable ? (
                        <input
                          type="text"
                          className="shadow-sm px-3 py-1.5 border border-gray-300 focus:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm transition-all"
                          value={getFieldValue(row, col.id) || ''}
                          placeholder={col.placeholder || ''}
                          onChange={(e) =>
                            handleInputChange(row._id, col.id, e.target.value)
                          }
                        />
                      ) : (
                        <span>{getFieldValue(row, col.id) ?? '-'}</span>
                      ))}

                    {col.type === 'image' &&
                      (() => {
                        const rawVal = getFieldValue(row, col.id)
                        if (!rawVal) return <span>-</span>

                        const valStr = String(rawVal)
                        const isPdf = valStr.toLowerCase().endsWith('.pdf')
                        const src = normalizeImageSrc(valStr)
                        const filenameGuess =
                          src.split('/').pop().split('?')[0] ||
                          `${col.id}-${row._id}`

                        return (
                          <div className="flex flex-col items-center space-y-1">
                            <a
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault()
                                window.open(src, '_blank')
                              }}
                            >
                              {isPdf ? (
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                  alt="PDF Icon"
                                  className="w-10 h-10 object-contain"
                                />
                              ) : (
                                <img
                                  src={src}
                                  alt={col.label}
                                  className="mx-auto rounded-md w-12 h-12 object-cover"
                                />
                              )}
                            </a>
                            {/* <button
                              onClick={() =>
                                triggerDownload(src, filenameGuess)
                              }
                              className="hover:bg-gray-100 px-2 py-0.5 border rounded-md text-xs"
                            >
                              دانلود
                            </button> */}
                          </div>
                        )
                      })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex sm:flex-row flex-col justify-between items-center bg-gray-50 px-4 py-3 border-gray-200 border-t">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <p className="ml-2 text-gray-700 text-sm">نمایش در هر صفحه:</p>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="py-1 pr-8 pl-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="ml-2 text-gray-700 text-sm">
              نمایش {indexOfFirstRow + 1} -{' '}
              {Math.min(indexOfLastRow, rows.length)} از {rows.length} رکورد
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hover:bg-gray-100 disabled:opacity-50 p-1.5 border border-gray-300 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hover:bg-gray-100 disabled:opacity-50 p-1.5 border border-gray-300 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Tabs
        selectedIndex={activeTab}
        onSelect={(index) => {
          setActiveTab(index)
          setPageByTab((prev) => ({ ...prev, [index]: 1 })) // 👈 وقتی تب عوض شد، برگرد صفحه ۱
        }}
        className="border-gray-200 border-b"
      >
        <TabList className="flex space-x-1 overflow-x-auto">
          {columnGroups.map((group, index) => (
            <Tab
              key={`tab-${index}`}
              className={`px-4 py-2 text-sm font-medium bg-red-300 rounded-t-lg border-b-2 transition-colors ${
                activeTab === index
                  ? 'bg-red-50 border-red-700'
                  : 'border-transparent hover:text-red-700 hover:border-red-900'
              }`}
            >
              <span className="cursor-pointer">{group.label}</span>
            </Tab>
          ))}
        </TabList>

        <div className="py-4">
          {columnGroups.map((group, index) => (
            <TabPanel key={`panel-${index}`}>
              {renderTable(group.columns, index)}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
