import React from 'react'
import Image from 'next/image'

const LogoCloud = () => {
    return (
        <div className="bg-[#1D1E20] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-white">
                    Easy <span className='text-[#adc4ffe5] font-semibold '>Integration</span> with Your Favorite Tools
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="/reddit1.png"
                        alt="Reddit"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="/notion.png"
                        alt="Notion"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="/drive.png"
                        alt="Drive"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="/pocket.png"
                        alt="Pocket"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="/onedrive.png"
                        alt="OneDrive"
                        width={158}
                        height={48}
                    />
                </div>
            </div>
        </div>
    )
}

export default LogoCloud
