import { forwardRef, type InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  label: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className='relative h-10 w-full min-w-[200px]'>
        <input
          ref={ref}
          autoComplete='off'
          className={`webkit-autofill-border-white peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-normal font-sans text-gray-100 text-sm outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-cyan-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50`}
          placeholder=''
          {...props}
        />
        <label
          htmlFor={props.id}
          className={`before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none font-normal text-[11px] text-gray-300 leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-gray-200 before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-gray-200 after:border-t after:border-r after:transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:after:border-transparent peer-placeholder-shown:before:border-transparent peer-focus:text-[11px] peer-focus:text-cyan-400 peer-focus:leading-tight peer-focus:after:border-cyan-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:before:border-cyan-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-400 peer-disabled:after:border-transparent peer-disabled:before:border-transparent`}
        >
          {label}
        </label>
      </div>
    )
  }
)
