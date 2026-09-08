import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Controller, useFieldArray, useForm, type Control } from 'react-hook-form';
import { useCreatePortfolioHook, useGetPortfolioHook } from '../../hooks/admin.hook';
import Input from '../../shared/Input/Input';
import type { LinkDto, LinkForm, PortfolioForm, ProjectDto, ProjectForm, ProjectLinkForm } from '../../../objects/portafolio.dto';
import { CONSTANTS } from '../../../../helpers/constants';
import { TagsInput } from './TagsInput';
import './Admin.css';

const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
const emptyProjectLink: ProjectLinkForm = { url: CONSTANTS.EMPTY_STRING, urlName: CONSTANTS.EMPTY_STRING };
const emptySocialLink: LinkForm = { icon: null, url: CONSTANTS.EMPTY_STRING, urlName: CONSTANTS.EMPTY_STRING };

const emptyProject: ProjectForm = {
  description: CONSTANTS.EMPTY_STRING,
  image: null,
  links: [{ ...emptyProjectLink }],
  tags: [],
  title: CONSTANTS.EMPTY_STRING,
};

const defaultValues: PortfolioForm = {
  description: CONSTANTS.EMPTY_STRING,
  image: null,
  jobTitle: CONSTANTS.EMPTY_STRING,
  name: CONSTANTS.EMPTY_STRING,
  projects: [{ ...emptyProject }],
  links: [{ ...emptySocialLink }],
  website: { personalWebsite: CONSTANTS.EMPTY_STRING, url: CONSTANTS.EMPTY_STRING },
};

// Icono SVG reutilizable
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

type ProjectFieldsProps = {
  control: Control<PortfolioForm>;
  onRemove: () => void;
  projectIndex: number;
  initialProject?: ProjectDto | ProjectForm;
};

const ProjectFields = ({ control, onRemove, projectIndex, initialProject }: ProjectFieldsProps) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: `projects.${projectIndex}.links`,
  });

  return (
    <fieldset className="admin-form-section">
      <div className="admin-section-header">
        <legend>Project {projectIndex + 1}</legend>
        <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" onClick={onRemove} type="button">
          <TrashIcon /> Remove
        </button>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <Controller control={control} name={`projects.${projectIndex}.title`} render={({ field }) => <Input label="Title" onChange={field.onChange} value={field.value} />} />
        </div>
        <div className="col-md-6">
          <Controller
            control={control}
            name={`projects.${projectIndex}.image`}
            render={({ field }) => (
              <div>
                <Input accept={IMAGE_ACCEPT} inputType="file" label="Project image" onFileChange={field.onChange} />
                {typeof initialProject?.image === 'string' && !field.value && (
                  <span className="current-file-text">Archivo actual: {initialProject.image}</span>
                )}
              </div>
            )}
          />
        </div>
        <div className="col-12">
          <Controller control={control} name={`projects.${projectIndex}.description`} render={({ field }) => <Input inputType="textarea" label="Description" onChange={field.onChange} value={field.value} />} />
        </div>
        <div className="col-12">
          <Controller
            control={control}
            name={`projects.${projectIndex}.tags`}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} />}
          />
        </div>
      </div>

      <h3 className="admin-subheading">Links</h3>
      {fields.map((link, linkIndex) => (
        <div className="row g-3 align-items-end" key={link.id}>
          <div className="col-md-5">
            <Controller control={control} name={`projects.${projectIndex}.links.${linkIndex}.urlName`} render={({ field }) => <Input label="Name" onChange={field.onChange} value={field.value} />} />
          </div>
          <div className="col-md-6">
            <Controller control={control} name={`projects.${projectIndex}.links.${linkIndex}.url`} render={({ field }) => <Input inputType="url" label="URL" onChange={field.onChange} value={field.value} />} />
          </div>
          <div className="col-md-1 admin-row-action">
            <button className="btn-icon-danger" onClick={() => remove(linkIndex)} type="button" aria-label="Delete link">
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-outline-primary mt-3" onClick={() => append({ ...emptyProjectLink })} type="button">Add link</button>
    </fieldset>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<PortfolioForm>({ defaultValues });
  const { append: appendProject, fields: projects, remove: removeProject } = useFieldArray({ control, name: 'projects' });
  const { append: appendSocialLink, fields: socialLinks, remove: removeSocialLink } = useFieldArray({ control, name: 'links' });

  const { data: initialData, isLoading, isError, error } = useGetPortfolioHook();
  const { mutate, isPending } = useCreatePortfolioHook();

  useEffect(() => {
    if (isError) {
      const message =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        error?.message ||
        "Error al cargar portafolio";
      console.error("Error updating portfolio:", message);
      alert(message);
    }

    if (initialData) {
      reset({
        ...defaultValues,
        ...initialData,
        image: null,
        website: initialData.website ?? defaultValues.website,
        projects: initialData.projects?.length
          ? initialData.projects.map((project: ProjectDto) => ({
              ...emptyProject,
              ...project,
              image: null,
              links: project.links?.length
                ? project.links.map((link: LinkDto) => ({
                    urlName: link.urlName ?? CONSTANTS.EMPTY_STRING,
                    url: link.url ?? CONSTANTS.EMPTY_STRING,
                  }))
                : [{ ...emptyProjectLink }],
            }))
          : defaultValues.projects,
        links: initialData.links?.length
          ? initialData.links.map((link: LinkDto) => ({
              ...emptySocialLink,
              ...link,
              icon: null,
            }))
          : defaultValues.links,
      });
    }
  }, [initialData, reset, isError, error]);

  const onSubmit = async (values: PortfolioForm) => {
    const resolvedProfileFile = values.image instanceof File
      ? values.image.name
      : (values.image ?? initialData?.file ?? initialData?.image ?? null);

    const portfolio = {
      ...values,
      file: resolvedProfileFile,
      image: resolvedProfileFile,
      projects: values.projects.map((project, projectIndex) => {
        const resolvedProjectFile = project.image instanceof File
          ? project.image.name
          : (project.image ?? initialData?.projects?.[projectIndex]?.file ?? initialData?.projects?.[projectIndex]?.image ?? null);

        return {
          ...project,
          file: resolvedProjectFile,
          image: resolvedProjectFile,
          links: project.links.map((link) => ({
            urlName: link.urlName,
            url: link.url,
            icon: null,
          })),
        };
      }),
      links: values.links.map((link, linkIndex) => ({
        ...link,
        icon: link.icon instanceof File ? link.icon.name : (link.icon ?? initialData?.links?.[linkIndex]?.icon ?? null),
      })),
    };

    const formData = new FormData();
    formData.append('portfolioData', new Blob([JSON.stringify(portfolio)], { type: 'application/json' }));

    if (values.image instanceof File) formData.append('profilePic', values.image);

    values.projects.forEach((project) => {
      if (project.image instanceof File) formData.append('proyect', project.image);
    });

    values.links.forEach((link) => {
      if (link.icon instanceof File) formData.append('icon', link.icon);
    });

    mutate(formData, {
      onSuccess: () => {
        alert("Portfolio updated successfully.");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.error("Error updating portfolio:", error.response?.status);
          alert(error.response?.data?.message || error.message);
        } else {
          alert("Error al actualizar portafolio.");
        }
      }
    });
  };

  const processExit = () => {
    localStorage.removeItem('token');
    navigate('/admin/login', { replace: true });
  };

  if (isLoading) return <div className="text-center py-5">Cargando portafolio...</div>;

  return (
    <main className="admin-panel container py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-4">Portfolio editor</h1>
        <button type="button" className="btn btn-primary mb-4" onClick={processExit}>
          Exit application
        </button>

        <fieldset className="admin-form-section">
          <legend>Profile</legend>
          <div className="row g-3">
            <div className="col-md-6"><Controller control={control} name="name" render={({ field }) => <Input label="Name" onChange={field.onChange} value={field.value} />} /></div>
            <div className="col-md-6"><Controller control={control} name="jobTitle" render={({ field }) => <Input label="Job title" onChange={field.onChange} value={field.value} />} /></div>
            <div className="col-12">
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <div>
                    <Input accept={IMAGE_ACCEPT} inputType="file" label="Profile image" onFileChange={field.onChange} />
                    {typeof initialData?.image === 'string' && !field.value && (
                      <span className="current-file-text">Archivo actual: {initialData.image}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="col-12"><Controller control={control} name="description" render={({ field }) => <Input inputType="textarea" label="Description" onChange={field.onChange} value={field.value} />} /></div>
          </div>
        </fieldset>

        <fieldset className="admin-form-section">
          <legend>Website</legend>
          <div className="row g-3">
            <div className="col-md-6"><Controller control={control} name="website.personalWebsite" render={({ field }) => <Input label="Website name" onChange={field.onChange} value={field.value} />} /></div>
            <div className="col-md-6"><Controller control={control} name="website.url" render={({ field }) => <Input inputType="url" label="Website URL" onChange={field.onChange} value={field.value} />} /></div>
          </div>
        </fieldset>

        <section aria-label="Projects">
          {projects.map((project, projectIndex) => (
            <ProjectFields
              control={control}
              key={project.id}
              onRemove={() => removeProject(projectIndex)}
              projectIndex={projectIndex}
              initialProject={initialData?.projects?.[projectIndex]}
            />
          ))}
          <button className="btn btn-outline-primary mb-4" onClick={() => appendProject({ ...emptyProject, links: [{ ...emptyProjectLink }] })} type="button">Add project</button>
        </section>

        <fieldset className="admin-form-section">
          <legend>Social links</legend>
          {socialLinks.map((link, linkIndex) => (
            <div className="row g-3 align-items-end" key={link.id}>
              <div className="col-md-3"><Controller control={control} name={`links.${linkIndex}.urlName`} render={({ field }) => <Input label="Name" onChange={field.onChange} value={field.value} />} /></div>
              <div className="col-md-4"><Controller control={control} name={`links.${linkIndex}.url`} render={({ field }) => <Input inputType="url" label="URL" onChange={field.onChange} value={field.value} />} /></div>
              <div className="col-md-4">
                <Controller
                  control={control}
                  name={`links.${linkIndex}.icon`}
                  render={({ field }) => (
                    <div>
                      <Input accept={IMAGE_ACCEPT} inputType="file" label="Icon" onFileChange={field.onChange} />
                      {typeof initialData?.links?.[linkIndex]?.icon === 'string' && !field.value && (
                        <span className="current-file-text">Archivo actual: {String(initialData.links[linkIndex].icon)}</span>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="col-md-1 admin-row-action">
                <button className="btn-icon-danger" onClick={() => removeSocialLink(linkIndex)} type="button" aria-label="Delete link">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-outline-primary mt-3" onClick={() => appendSocialLink({ ...emptySocialLink })} type="button">Add social link</button>
        </fieldset>

        <button className="btn btn-primary" type="submit" disabled={isPending}>Save portfolio</button>
      </form>
    </main>
  );
};

export default Admin;