import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { marqueeWords } from '../../data/siteData'
import { fadeUp } from '../../lib/animations'

const MotionSection = motion.section

function MarqueeRibbon() {
  const words = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords]

  return (
    <MotionSection
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mx-auto flex w-full items-center overflow-hidden py-14 lg:py-20"
    >
      <div className="w-full -rotate-2 scale-105 border-y border-emerald-800/20 bg-white/90 py-4 shadow-lg backdrop-blur-md dark:border-emerald-500/20 dark:bg-zinc-950/85">
        <div className="marquee-track flex w-max">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="mx-6 flex items-center gap-6 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#064e3b] dark:text-emerald-400"
            >
              {word}
              <Sparkles size={14} className="text-emerald-700 dark:text-emerald-400" />
            </span>
          ))}
        </div>
      </div>
    </MotionSection>
  )
}

export default MarqueeRibbon



