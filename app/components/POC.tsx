"use client"
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
const POC = () => {
    return (
        <footer className="relative z-10 border-t border-neutral-200/90 dark:border-neutral-900 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md w-full transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-900">

                {/* Chairman Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col space-y-4 pb-6 md:pb-0"
                >
                    <div>
                        <span className="text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Leadership
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mt-0.5">Rithuparna J B </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Chairperson</p>
                    </div>
                    <div className="space-y-3">
                        <a
                            href="tel:+918891041158"
                            className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm w-fit"
                        >
                            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 group-hover:bg-red-50 dark:group-hover:bg-red-950/30 border border-neutral-200 dark:border-neutral-800/80 group-hover:border-red-500/40 transition-colors">
                                <Phone className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                            </div>
                            <span className="font-medium">+91 88910 41158</span>
                        </a>
                        
                    </div>
                </motion.div>

                {/* General Secretary Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col space-y-4 pt-6 md:pt-0 md:pl-12"
                >
                    <div>
                        <span className="text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Leadership
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mt-0.5">Adithyan C S </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">General Secretary</p>
                    </div>
                    <div className="space-y-3">
                        <a
                            href="tel:+919847302150"
                            className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm w-fit"
                        >
                            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 group-hover:bg-red-50 dark:group-hover:bg-red-950/30 border border-neutral-200 dark:border-neutral-800/80 group-hover:border-red-500/40 transition-colors">
                                <Phone className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                            </div>
                            <span className="font-medium">+91 98473 02150</span>
                        </a>
                        
                    </div>
                </motion.div>

            </div>
        </footer>
    )
}

export default POC