'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import swal from 'sweetalert'
import PropTypes from 'prop-types'

/**
 * Sms component
 * props:
 *  - phone (string) required
 *  - type: 'login' | 'register' (default 'login')
 *  - hideOtp(): callback to close the OTP panel
 *  - name, email (optional) — for register flow
 */
export default function Sms({ phone, type = 'login', hideOtp, name, email }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendRemaining, setResendRemaining] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    // شروع شمارش معکوس برای ارسال مجدد
    setResendRemaining(60)
    const t = setInterval(() => {
      setResendRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phone])

  const showError = (msg) => {
    setError(msg)
    swal(msg, { icon: 'error' })
  }

  const handleVerify = async (e) => {
    e?.preventDefault()
    setError('')

    if (!phone) return showError('شماره تلفن معتبر نیست')
    if (!code || code.trim().length < 4) return showError('کد را وارد نمایید')

    try {
      setLoading(true)
      const payload = { phone, code: String(code).trim() }
      if (type === 'register') {
        if (name) payload.name = name
        if (email) payload.email = email
      }

      // انتخاب endpoint بر اساس type
      const endpoint =
        type === 'register'
          ? '/api/auth/sms/verify-register'
          : '/api/auth/sms/verify-login'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (res.status === 200 || res.status === 201) {
        swal(
          type === 'login'
            ? `ورود شما موفق بود`
            : 'ثبت نام و ورود با موفقیت انجام شد',
          { icon: 'success' }
        ).then(() => {
          hideOtp && hideOtp()
          router.replace('/user-account')
        })
      } else {
        showError(data.message || 'خطا در تایید کد')
      }
    } catch (err) {
      console.error('Sms verify error:', err)
      showError('خطای شبکه، دوباره تلاش کنید')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!phone) return showError('شماره تلفن معتبر نیست')
    if (resendRemaining > 0) return

    try {
      setIsResending(true)
      const endpoint =
        type === 'register' ? '/api/auth/sms/send' : '/api/auth/sms/loginsend'

      const body = { phone }
      if (type === 'register') {
        if (name) body.name = name
        if (email) body.email = email
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json().catch(() => ({}))
      if (res.status === 201) {
        swal('کد با موفقیت ارسال شد', { icon: 'success' })
        setResendRemaining(60)
        const t = setInterval(() => {
          setResendRemaining((r) => {
            if (r <= 1) {
              clearInterval(t)
              return 0
            }
            return r - 1
          })
        }, 1000)
      } else {
        showError(data.message || 'خطا در ارسال مجدد کد')
      }
    } catch (err) {
      console.error('resend error:', err)
      showError('خطای شبکه، دوباره تلاش کنید')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-md">
      <h3 className="mb-4 font-medium text-lg">ثبت کد تایید</h3>
      <p className="mb-4 text-gray-600 text-sm">
        کد به شماره {phone} ارسال شده است
      </p>

      <form onSubmit={handleVerify}>
        <div className="mb-4">
          <label className="block mb-1 text-sm">کد</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="کد ۶ رقمی"
            inputMode="numeric"
            maxLength={6}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-500 disabled:opacity-60 py-2 rounded text-white"
          >
            {loading ? 'در حال بررسی...' : 'تایید و ورود'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendRemaining > 0 || isResending}
            className="disabled:opacity-60 px-4 py-2 border rounded"
          >
            {resendRemaining > 0
              ? `ارسال مجدد (${resendRemaining}s)`
              : isResending
              ? 'در حال ارسال...'
              : 'ارسال مجدد'}
          </button>
        </div>
      </form>

      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => hideOtp && hideOtp()}
          className="text-blue-600 underline"
        >
          بازگشت
        </button>
      </div>

      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
    </div>
  )
}

Sms.propTypes = {
  phone: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['login', 'register']),
  hideOtp: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
}
