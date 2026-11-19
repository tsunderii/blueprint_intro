const projectUrl = process.env.VITE_SUPABASE_URL?.trim()
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

try {
  if (!projectUrl || !publishableKey?.startsWith('sb_publishable_')) {
    throw new Error('Fill in the Project URL and sb_publishable_ key in .env.local.')
  }

  const url = new URL(projectUrl)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Use the HTTPS Project URL from the Supabase Connect panel.')
  }

  const response = await fetch(new URL('/auth/v1/health', url), {
    headers: { apikey: publishableKey },
    redirect: 'error',
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Supabase returned HTTP ${response.status}. Check the Project URL and Publishable key.`)
  }

  console.log('Supabase connection works.')
} catch (error) {
  console.error(`Supabase check failed: ${error.message}`)
  process.exitCode = 1
}
