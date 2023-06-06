import {Helmet} from 'react-helmet-async';

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keyword" content={keywords}/>
    </Helmet>
  )
};


Meta.defaultProps = {
    title: "Bienvenue chez PROGADGET!",
    description: "Du Hight-Tech pas cher",
    keywords: "Le roi de l'électronic"
};

export default Meta