import { useState } from 'react'
import { BiWorld } from 'react-icons/bi'
import { formatImageUrl } from '../../../../helpers/imageFormatter'
import { openSafeExternalUrl, sanitizeUrl } from '../../../../helpers/sanitizer'

import './Social.css'
import type { LinkDto } from '../../../objects/portafolio.dto'

/**
 * @description Generates a social links component that displays icons and links for various social media platforms.
 * @param {Object} param0 - The component props.
 * @param {LinkDto[]} param0.socialLinks - An array of social link objects containing icon, urlName, and url.
 * @returns {JSX.Element} The rendered social links component.
 */
const Social = ({ socialLinks }: { socialLinks: LinkDto[] }) => {
    const [brokenIcons, setBrokenIcons] = useState<Set<number>>(new Set());

    const handleIconClick = (link: string) => {
        openSafeExternalUrl(link);
    };

    return (
        <>
            <div className="social-links-container">
                {socialLinks.map((link, index) => (
                    <div className="social-link" key={index} onClick={(e) => { e.preventDefault(); handleIconClick(link.url); }}>
                        {link.icon && !brokenIcons.has(index) ? (
                            <img
                                className="social-icon"
                                src={formatImageUrl(link.icon)}
                                alt={link.urlName}
                                onError={() => setBrokenIcons(prev => new Set(prev).add(index))}
                            />
                        ) : (
                            <BiWorld className="social-icon" onClick={(e) => {e.preventDefault(); handleIconClick(link.url)}} />
                        )
                        }
                        <a href={sanitizeUrl(link.url)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{link.urlName}</a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Social;