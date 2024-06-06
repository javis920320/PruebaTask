import React from 'react'

const InputText = ({label,name,onChange}) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-3">
                            <label
                                for="first-name"
                                className="block text-sm font-medium leading-6 text-gray-400"
                            >
                               {label}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    required
                                    name={name}
                                    onChange={onChange}
                                    autocomplete="given-name"
                                    className=" bg-indigo-400 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
  )
}

export default InputText
