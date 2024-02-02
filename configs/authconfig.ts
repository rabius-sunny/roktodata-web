import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnRequest = nextUrl.pathname.startsWith('/request')
      const isOnLogin = nextUrl.pathname.startsWith('/auth')
      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl))
      } else if (isOnDashboard || isOnRequest) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      return true
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
