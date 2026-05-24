'use client'

import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaCloudDownloadAlt } from "react-icons/fa";

const RecordeAccardion2 = ({ iweRegistration }) => {
  const [openGroups, setOpenGroups] = useState({})

  const toggleGroup = (partName) => {
    setOpenGroups(prev => ({ ...prev, [partName]: !prev[partName] }))
  }

  // اگر هیچ ثبت‌نامی پیدا نشد
  if (!iweRegistration) {
    return (
      <div className="bg-gray-50 p-4 border border-gray-200 rounded text-gray-500">
        دوره با shortName "IWE" یافت نشد.
      </div>
    )
  }

  // گروه‌بندی رکوردینگ‌ها بر اساس part
  const recordingsByPart = iweRegistration.recordings.reduce((groups, rec) => {
    if (!groups[rec.part]) groups[rec.part] = []
    groups[rec.part].push(rec)
    return groups
  }, {})

  return (
    <div className="space-y-10">
      <h2 className="mb-5 font-bold text-red-800">
        {iweRegistration?.courseId?.name || '--'}
      </h2>

      {Object.entries(recordingsByPart).map(([partName, recordings]) => {
        const isOpen = openGroups[partName] || false

        return (
          <div key={partName} className="bg-white shadow rounded-xl w-full">
            <div
              onClick={() => toggleGroup(partName)}
              className="flex justify-between bg-gray-100 p-5 cursor-pointer"
            >
              <p className="flex items-center gap-2">
                <MdOutlineKeyboardArrowDown /> {partName}
              </p>
              {isOpen ? (
                <FaMinusCircle className="text-red-800" />
              ) : (
                <FaPlusCircle className="text-red-800" />
              )}
            </div>

            {isOpen && (
              <div className="space-y-4 bg-red-800 p-5 border-gray-100 border-b-2 rounded-xl text-white text-sm">
                {recordings.map((recording) => (
                  <div  className='flex justify-between' key={recording._id}>
                    <span >
                      {recording.title}
                    </span>

                    <a className='flex justify-center items-center gap-2' href={recording.url} target="_blank" rel="noreferrer">          <FaCloudDownloadAlt/>دانلود</a>
           
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default RecordeAccardion2
