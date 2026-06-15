const IPPANEL_SEND_URL = 'https://edge.ippanel.com/v1/api/send'

const getEnv = (...keys) => keys.map((key) => process.env[key]).find(Boolean)

export const toE164IranMobile = (phone) => {
  const digits = String(phone || '').trim().replace(/[^\d+]/g, '')
  if (!digits) return ''
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('0098')) return `+${digits.slice(2)}`
  if (digits.startsWith('98')) return `+${digits}`
  if (digits.startsWith('0')) return `+98${digits.slice(1)}`
  return `+98${digits}`
}

export const sendOtpSms = async ({ phone, code }) => {
  const token = getEnv('SMS_IPPANEL_API_TOKEN', 'IPPANEL_API_TOKEN', 'IPPANEL_TOKEN')
  const fromNumber = toE164IranMobile(getEnv('SMS_IPPANEL_FROM_NUM', 'IPPANEL_FROM') || '3000505')
  const patternCode = getEnv('SMS_IPPANEL_PATTERN_CODE', 'IPPANEL_PATTERN')
  const patternParam = getEnv('SMS_IPPANEL_PATTERN_PARAM', 'IPPANEL_PATTERN_PARAM') || 'verification-code'

  if (!token) throw new Error('IPPANEL API token is not configured')
  if (!patternCode) throw new Error('IPPANEL pattern code is not configured')

  const body = {
    sending_type: 'pattern',
    from_number: fromNumber,
    code: patternCode,
    recipients: [toE164IranMobile(phone)],
    params: {
      [patternParam]: String(code),
    },
  }

  const response = await fetch(IPPANEL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok || data?.meta?.status === false) {
    const message = data?.meta?.message || `IPPANEL request failed with status ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.detail = data
    throw error
  }

  return data
}
