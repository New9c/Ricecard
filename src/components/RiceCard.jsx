import Image from './ricecard_modules/Image'
import Dotfiles from './ricecard_modules/Dotfiles'
import Credit from './ricecard_modules/Credit'
import Hint from './ricecard_modules/Hint'
import Fields from './ricecard_modules/Fields'

import Blur from './ricecard_modules/Blur'
import SvgStyles from './ricecard_modules/SvgStyles'

export default function RiceCard({ activeFont, dotfiles, hint, fields, theme, image, credit }) {
    return (
        <svg
            id="rice-svg"
            width="100%"
            height="100%"
            viewBox={`-15 -15 ${theme.width + 30} ${theme.height + 30}`}
            xmlns="http://www.w3.org/2000/svg"
            fontFamily={activeFont?.name || "monospace"}
        >
            <defs>
                <Blur theme={theme} />
                <SvgStyles activeFont={activeFont} />
            </defs>
            <rect width={theme.width} height={theme.height} rx={theme.radius} fill={theme.bg} filter={theme.haveBacklight ? "url(#blur)" : undefined} />

            <Image image={image} theme={theme} />
            <Dotfiles dotfiles={dotfiles} theme={theme} />
            <Hint hint={hint} theme={theme} />
            <Credit credit={credit} theme={theme} />
            <Fields fields={fields} theme={theme} />

        </svg>
    );
}
