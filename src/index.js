// Import all plugins
import * as bootstrap from 'bootstrap';

// Or import only needed plugins
import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';
import './custom.scss';

const btn = document.querySelector('.btn-share');
btn.addEventListener('click', async (event) => {
        try {
            const url = location.href;
            const text = document.querySelector('meta[property="og:title"]').content;
            if (navigator.share) {
                await navigator.share({
                    url : url,
                    text: text,
                })
            } else {
                await navigator.clipboard.writeText(`${text} ${url}`);
                const popover = new bootstrap.Popover(event.target, { content: 'copied to clipboard' });
                popover.show();
                setTimeout(() => popover.dispose(), 1000);
            }
        } catch (error) {}
    }
);