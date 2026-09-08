import { BiWorld } from 'react-icons/bi'
import { formatImageUrl } from '../../../../helpers/imageFormatter'
import { sanitizeUrl } from '../../../../helpers/sanitizer'

import './Proyect.css'
import { StyledChip, StyledStack } from './Proyect.styles'
import type { LinkDto } from '../../../objects/portafolio.dto'

interface ProyectProps {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: LinkDto[];
}

const Proyect = ({ title, description, image, tags, links }: ProyectProps) => {
    return (
        <>
            <section className="proyect">
                <section className="content">
                    {image && <img src={formatImageUrl(image)} alt="Project" />}
                    <div className="project-content">
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className="links">
                            {links.map((link, index) => (
                                <div className="link-container" key={index}>
                                    <BiWorld className="project-link-icon" />
                                    <a href={sanitizeUrl(link.url)} target="_blank" rel="noopener noreferrer">{link.urlName}</a>
                                </div>
                            ))}
                        </div>
                        <div className="tags">
                            <StyledStack direction="row" spacing={1} useFlexGap>
                                {tags.map((tag, index) => (
                                    <StyledChip key={index} label={tag} />
                                ))}
                            </StyledStack>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Proyect;