import { Input } from '@components/Input'

export const Form = () => {
    const handleChange = (value: string) => {
        console.log(value)
    }

    return (
        <div>
            <form action="#">
                <h3 class="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                    Firmware Settings
                </h3>
                <div class="flex justify-center gap-5">
                    <div class="mt-5 max-w-[700px] w-full ">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <Input
                                    onChange={handleChange}
                                    placeholder="ssid"
                                    header="SSID"
                                    type="text"
                                    id="ssid"
                                    required={true}
                                />
                            </div>
                            <div>
                                <Input
                                    onChange={handleChange}
                                    placeholder="password"
                                    header="WiFi Password"
                                    type="text"
                                    id="password"
                                    required={true}
                                />
                            </div>
                            <div>
                                <Input
                                    onChange={handleChange}
                                    placeholder="password"
                                    header="Confirm Password"
                                    type="text"
                                    id="confirmPassword"
                                    required={true}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
