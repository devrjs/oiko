import type { ReactNode } from 'react'

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background'>
      {/* Animated gradient mesh background */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute top-[-30%] left-[-20%] h-[70vh] w-[60vw] rounded-full bg-linear-to-br from-primary/10 via-transparent to-transparent blur-[120px] motion-safe:animate-[gradientShift_8s_ease-in-out_infinite]' />
        <div className='absolute top-[10%] right-[-15%] h-[60vh] w-[50vw] rounded-full bg-linear-to-bl from-foreground/5 via-transparent to-transparent blur-[100px] motion-safe:animate-[gradientShift_12s_ease-in-out_infinite_reverse]' />
        <div className='absolute bottom-[-20%] left-[30%] h-[50vh] w-[40vw] rounded-full bg-linear-to-tr from-primary/8 via-transparent to-transparent blur-[80px] motion-safe:animate-[gradientShift_10s_ease-in-out_infinite]' />
        {/* Subtle dot grid */}
        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.04]'
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--foreground) 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10'>{children}</div>

      <style>{`
        @keyframes gradientShift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  )
}
