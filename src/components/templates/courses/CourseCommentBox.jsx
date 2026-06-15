// import { AiOutlineStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'

const CourseCommentBox = ({ author, date, body, score, replies = [] }) => {
  return (
    <div className="flex flex-col bg-gray-100 mr-2 pb-[14px] rounded-[10px] w-full min-h-[110px]">
      {/* کامنت اصلی */}
      <div className="flex justify-between px-5 py-3">
        <div className="flex">
          <span>{author?.name}</span>
          <span className="flex mr-3">
            {new Array(score).fill(0).map((_, index) => (
              <FaStar key={`filled-${index}`} className="text-yellow-400" />
            ))}
            {new Array(5 - score).fill(0).map((_, index) => (
              <AiOutlineStar
                key={`empty-${index}`}
                className="text-yellow-400"
              />
            ))}
          </span>
        </div>
        <span>{new Date(date).toLocaleDateString('fa-IR')}</span>
      </div>

      <div className="px-5 py-3 text-justify">{body}</div>

      {/* بخش جواب‌ها */}
      {replies.length > 0 && (
        <div className="bg-gray-200 m-auto mt-3 p-3 rounded-xl w-[85%]">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="mb-2 pb-2 border-gray-300 last:border-0 border-b"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{reply.author?.name}</span>
                <span>
                  {new Date(reply.createdAt).toLocaleDateString('fa-IR')}
                </span>
              </div>
              <div className="mt-1 px-2 text-justify">{reply.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseCommentBox
