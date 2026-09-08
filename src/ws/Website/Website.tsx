import './Website.css'

import { TitleSubsection } from '../../helpers/subsections/Titles'
import Navbar from './shared/Navbar/Navbar'
import Profile from './shared/Profile/Profile'
import Proyect from './shared/Proyect/Proyect'
import Social from './shared/Social/Social'
import { useGetPortfolioMainHook } from '../Admin/hooks/admin.hook';
import type { PortfolioDto } from '../objects/portafolio.dto';
import { CONSTANTS } from '../../helpers/constants';

function Website() {
  const { data: initialData, isLoading } = useGetPortfolioMainHook();

  const portfolioData: PortfolioDto = initialData ?? {} as PortfolioDto;
  const socialLinks = portfolioData?.links ?? portfolioData?.socialLinks ?? [];
  const projects = portfolioData?.projects ?? [];
  const profileImage = portfolioData?.image ?? portfolioData?.file ?? CONSTANTS.EMPTY_STRING;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar
        personalWebsite={portfolioData.website?.personalWebsite ?? CONSTANTS.EMPTY_STRING}
        url={portfolioData.website?.url ?? CONSTANTS.EMPTY_STRING}
      />

      <Profile
        name={portfolioData?.name}
        jobTitle={portfolioData?.jobTitle}
        description={portfolioData?.description}
        image={profileImage}
      />

      <div id="proyects">
        <TitleSubsection title="Projects" />
        {projects.map((project, index) => (
          <Proyect
            key={index}
            title={project?.title ?? project?.name ?? CONSTANTS.EMPTY_STRING}
            description={project?.description}
            image={project?.image ?? project?.file ?? CONSTANTS.EMPTY_STRING}
            tags={project?.tags ?? []}
            links={project?.links ?? []}
          />
        ))}
      </div>

      <section id="social">
        <TitleSubsection title="Social Networks" />
        <Social socialLinks={socialLinks} />
      </section>

      <p className="footer-text">© 2026 FAJG. All rights reserved.</p>
    </>
  );
}

export default Website

