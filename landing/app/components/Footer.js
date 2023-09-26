import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-[#1D1E20]" aria-labelledby="footer-heading">
            <div className="pt-4 w-full lg:w-11/12 md:w-11/12 lg:mx-auto md:mx-auto">
                <div className="container mx-auto py-6">
                    <div className="xl:flex lg:flex md:flex pt-6">
                        <div className="w-11/12 xl:w-3/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0">
                            <div className="flex items-center mb-6 xl:mb-0 lg:mb-0">
                                <a className="mt-6" target="_blank" href="https://www.producthunt.com/posts/mygptbrain?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mygptbrain">
                                    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=412183&theme=neutral" alt="myGPTBrain - QnA over your personal data & bookmarks | Product Hunt" />
                                </a>
                            </div>
                        </div>
                        <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
                            <ul>
                                <li className="font-bold text-xl mb-6 leading-6 text-white">About</li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target="_blank" href="https://public.mygptbrain.com/privacy-policy">Privacy Policy</a>
                                </li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target='_blank' href="https://public.mygptbrain.com/terms-of-service">Terms and Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
                            <ul>
                                <li className="font-bold text-xl mb-6 leading-6 text-white">Social Media</li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target='_blank' href="https://twitter.com/myGPTBrain">Twitter</a>
                                </li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target="_blank" href="https://twitter.com/myGPTBrain">Product Hunt</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
                            <ul>
                                <li className="font-bold text-xl mb-6 leading-6 text-white">Contact Us</li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target='_blank' href="https://twitter.com/myGPTBrain">Twitter</a>
                                </li>
                                <li className="text-base mb-5 leading-6 text-gray-300 hover:text-white">
                                    <a target='_blank' href="mailto:support@mygptbrain.com">Email</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
