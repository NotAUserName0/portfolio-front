import './Titles.css';

export const TitleSubsection = ({ title }: { title: string }) => {
    return (
        <>
            <h2 className="title-subsection">{title}</h2>
            <hr />
        </>
    );
};