import React from 'react'

const ScoreTable = ({ scores }) => {
  // helper: normalize score entry
  const getScoreValue = (s) => {
    if (s == null) return 0
    if (typeof s === 'number') return s
    if (typeof s === 'object' && 'score' in s) return Number(s.score) || 0
    if (!isNaN(Number(s))) return Number(s)
    return 0
  }

  // گروه‌بندی رکوردها بر اساس student و course و part
  const groupedRecords = {}
  scores.forEach((record) => {
    const key = `${record.student}_${record.course}_${record.part}`
    if (!groupedRecords[key]) {
      groupedRecords[key] = []
    }
    groupedRecords[key].push(record)
  })

  // برای هر گروه، رکوردها را بر اساس تاریخ مرتب کرده و bestSoFar را محاسبه می‌کنیم
  const processedRecords = []
  Object.values(groupedRecords).forEach((group) => {
    // مرتب کردن بر اساس تاریخ ایجاد (صعودی)
    const sortedGroup = [...group].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    )

    let bestSoFar = new Array(4).fill(-Infinity) // فرض بر 4 ماژول

    sortedGroup.forEach((record) => {
      // به روزرسانی bestSoFar با نمرات این رکورد
      const scoresArray = record.scores || []
      scoresArray.forEach((s, idx) => {
        const val = getScoreValue(s)
        if (val > bestSoFar[idx]) {
          bestSoFar[idx] = val
        }
      })

      // ایجاد یک کپی از bestSoFar برای این رکورد
      const currentBest = [...bestSoFar]

      // نرمال‌سازی -Infinity به 0
      for (let j = 0; j < currentBest.length; j++) {
        if (currentBest[j] === -Infinity) currentBest[j] = 0
      }

      // محاسبه وضعیت برای این رکورد بر اساس currentBest
      const part = record.part
      const bs = currentBest

      // Pass for part 1: first 3 modules all > 60
      const isPassPart1 = part === 1 && bs.slice(0, 3).every((v) => v > 60)
      // Part 3 DVS: all > 75
      const isDVSPass = part === 3 && bs.slice(0, 4).every((v) => v > 75)
      // Part 3: all >=45 => some may need oral if <=75
      const isAllAbove45 = part === 3 && bs.slice(0, 4).every((v) => v >= 45)
      const oralModules = isAllAbove45
        ? bs
            .map((v, idx) => (v <= 75 ? `ماژول ${idx + 1}` : null))
            .filter(Boolean)
        : []

      // اضافه کردن رکورد پردازش شده به آرایه
      processedRecords.push({
        ...record,
        bestSoFar: currentBest,
        status: isPassPart1
          ? 'پاس شده ✅'
          : isDVSPass
          ? 'امتحان شفاهی DVS 🎤'
          : oralModules.length > 0
          ? `شامل امتحان شفاهی: ${oralModules.join(' ، ')} 📘`
          : '--',
      })
    })
  })

  // حالا می‌توانیم processedRecords را نمایش دهیم
  // اما توجه: اکنون processedRecords شامل رکوردهای زیادی است (برای هر گروه، هر رکورد با bestSoFar مربوطه)

  // اگر بخواهیم تنها آخرین وضعیت هر گروه را نمایش دهیم، باید آخرین رکورد هر گروه را بگیریم.
  // اما از آنجایی که در ScoreForm همه رکوردها نمایش داده می‌شوند، ما هم همه را نمایش می‌دهیم.

  // مرتب‌سازی کلی بر اساس تاریخ ایجاد (نزولی) تا newest first باشد؟ یا صعودی؟
  // در ScoreForm صعودی است (قدیمی‌ترین اول). اما در جدول معمولاً newest first است.
  // از آنجایی که در ScoreForm قدیمی‌ترین اول است، ما هم همینطور انجام می‌دهیم.

  processedRecords.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return (
    <>
      <div className="bg-white m-auto pb-20 rounded-lg w-[100%]">
        <div className="m-auto pb-20 w-[90%]">
          {/* <h3 className="mb-2 font-bold text-gray-800 text-lg"> نمرات</h3> */}

          {processedRecords.length === 0 ? (
            <div className="bg-gray-50 p-4 border border-gray-200 rounded">
              <p className="text-gray-500">
                تاریخچه‌ای برای این دانشجو وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="m-auto mb-40 w-[100%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
                <thead className="bg-gray-50 dark:bg-gray-700 border border-gray-100 text-gray-700 dark:text-gray-400 text-xs uppercase">
                  <tr className="bg-gray-100">
                    <th className="p-2 border border-gray-300 text-right">
                      دانشجو
                    </th>
                    <th className="p-2 border border-gray-300 text-right">
                      پارت
                    </th>
                    <th className="p-2 border border-gray-300 text-center">
                      ماژول 1
                    </th>
                    <th className="p-2 border border-gray-300 text-center">
                      ماژول 2
                    </th>
                    <th className="p-2 border border-gray-300 text-center">
                      ماژول 3
                    </th>
                    <th className="p-2 border border-gray-300 text-center">
                      ماژول 4
                    </th>
                    {/* <th className="p-2 border border-gray-300 text-center">میانگین</th> */}
                    <th className="p-2 border border-gray-300 text-center">
                      وضعیت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processedRecords.map((record) => {
                    const scores = record.scores || []
                    return (
                      <tr key={record._id}>
                        <td className="p-2 border border-gray-200 text-right">
                          {record.student?.userId?.name || '---'}
                        </td>
                        <td className="p-2 border border-gray-200 text-center">
                          {record.part}
                        </td>

                        {scores.map((s, idx) => {
                          const val = getScoreValue(s)
                          let cls = 'p-2 border border-gray-300 text-center'

                          if (record.part === 1 && idx < 3 && val > 60) {
                            cls += ' bg-green-100 text-green-800'
                          }

                          if (record.part === 3) {
                            if (val < 45) cls += ' bg-red-100 text-red-800'
                            else if (val <= 75)
                              cls += ' bg-yellow-100 text-yellow-800'
                            else cls += ' bg-green-100 text-green-800'
                          }

                          return (
                            <td key={idx} className={cls}>
                              {val.toFixed(1)}
                            </td>
                          )
                        })}

                        {/* <td className="p-2 border border-gray-300 font-medium text-center">
                          {((scores.reduce((sum, s) => sum + getScoreValue(s), 0)) / (scores.length || 1)).toFixed(1)}
                        </td> */}

                        <td className="p-2 border border-gray-300 font-bold text-center">
                          {record.status}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ul className="bg-gray-50 mt-10 p-4 rounded-lg text-sm">
        <li className="mb-2">نمره قبولی در پارت 1 بالای 60 می باشد</li>
        <li className="mb-2">نمره قبولی در پارت 3 بالای 45 می باشد</li>
        <li className="mb-2">
          در صورتی که در امتحان پارت 3 هر ماژولی را زیر 75 بگیرید شامل امتحان
          شفاهی همان ماژول میشوید
        </li>
        <li>
          در صورتی که در امتحان پارت 3 هر 4 ماژول را بالای 75 شوید به انتخاب DVS
          یک ماژول را امتحان میدهید
        </li>
      </ul>
    </>
  )
}

export default ScoreTable
