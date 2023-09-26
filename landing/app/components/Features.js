import React from 'react'
import { ArrowsClockwise, Bookmarks, Question } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'



const features = [
    {
        name: 'Imagine',
        description: 'not having to read your bookmarks',
        icon: Bookmarks,
    },
    {
        name: 'An Assistant',
        description: 'that could answer your questions, contextual to your bookmarks',
        icon: Question,
    },
    {
        name: 'A Service',
        description: 'that syncs with notion tables, drive files, pocket articles, & much more',
        icon: ArrowsClockwise,
    },
]

const Features = () => {
    return (
        <div id='features' className="bg-[#1D1E20] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-base font-semibold leading-7 text-[#adc4ffe5]">Everything you need</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Discover More with myGPTBrain</p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Seamlessly upload and analyze documents, gain insights with context-rich answers from your files and sources.
                    </p>
                </div>
            </div>
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <Image
                        src="/features.png"
                        alt="My GPT Brain dashboard"
                        className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                        width={2432}
                        height={1442}
                    />
                    <div className="relative" aria-hidden="true">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-[#1D1E20] pt-[7%]" />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-white">
                                <feature.icon className="absolute left-1 top-1 h-5 w-5 text-[#adc4ffe5]" aria-hidden="true" />
                                {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default Features
