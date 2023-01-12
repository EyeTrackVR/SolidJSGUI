import { createSignal } from 'solid-js'

const SettingsPage = () => {
    const [enabled, setEnabled] = createSignal(false)

    return (
        <div class="pb-[5rem] h-[95%] xl:h-[100%] xl:pb-[1rem] grow flex-col pt-6 py-6 px-8">
            {/* <Menu as="div" class="h-[95%] xl:h-[100%]">
                <div class="h-[95%] flex-1 grow rounded-[14px] border-solid border border-black shadow-lg leading-5 font-sans font-medium text-[.75rem]">
                    <div class="h-[100%] flex-1 overflow-auto grow rounded-[14px] pr-1 bg-[#0f0f0f] pt-[.5rem] pb-[.5rem] text-[#ffffffc4]">
                        <Title
                            title="General Settings"
                            children={
                                <GeneralSection
                                    GeneralSettings={GeneralSettings}
                                    onClickScan={() =>
                                        dispatch(
                                            mdnsActions.connectToMDNS({
                                                watcher: '_waterchamber._tcp',
                                                timestamp: 10,
                                            })
                                        )
                                    }
                                    onClickRequest={() =>
                                        dispatch(
                                            mdnsActions.getMDNSRestClient({
                                                endpoint: '/api/v1/builtin/command/json?type=data',
                                                deviceName: 'waterchamber.local',
                                            })
                                        )
                                    }
                                    onChange={() => setEnabled(!enabled())}
                                    enabled={enabled()}
                                />
                            }
                        />
                        <Title
                            title="Tracking Algorithm Settings"
                            children={<AlgoSection AlgoSettings={AlgoSettings} />}
                        />
                    </div>
                </div>
            </Menu> */}
        </div>
    )
}

export default SettingsPage
