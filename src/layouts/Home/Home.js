import gamestackTexture2Large from 'assets/consorcio1.png';
import gamestackTexture2Placeholder from 'assets/consorcio1.png';
import gamestackTexture2 from 'assets/consorcio1.png';
import gamestackTextureLarge from 'assets/consorcio2.png';
import gamestackTexturePlaceholder from 'assets/consorcio2.png';
import gamestackTexture from 'assets/consorcio2.png';
import sliceTextureLarge from 'assets/berken.png';
import sliceTexturePlaceholder from 'assets/berken.png';
import sliceTexture from 'assets/berken.png';
import sprTextureLarge from 'assets/elvigilante.png';
import sprTexturePlaceholder from 'assets/elvigilante.png';
import sprTexture from 'assets/elvigilante.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Javascript', 'React Js', 'Next Js', 'PHP', 'Full Stack'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Desarrollador Web Full Stack"
        description="Sentirme cómodo con el código me permite crear rápidamente prototipos y validar experiencias. Si está interesado en mis servicios, consulte mis redes sociales."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Desarrollando el futuro de los medios de comunicación."
        description="El Vigilante Web Medio de comunicación dedicado a visibilizar el acontecer ciudadano desde otra perspectiva."
        buttonText="Visitar Página Web"
        buttonLink="https://elvigilanteweb.com"
        model={{
          type: 'laptop',
          alt: 'El Vigilante Web',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Desarrollando el futuro de la Industria Petrolera."
        description="Es una empresa dedicada al área industrial y petrolera con un enfoque basado en la calidad; cuentan con más de 20 años de experiencia en ejecución de obras y servicios en el área de construcción, mantenimiento y transporte en el Lago de Maracaibo."
        buttonText="Visitar Página Web"
        buttonLink="https://consorcioconstrutecz.com"
        model={{
          type: 'phone',
          alt: 'Consorcio Construtecz',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Desarrollando el Futuro de los Servicios Lacustres."
        description="BERKEN Inicia operaciones en Venezuela prestando servicios de transporte lacustre con una flota propia para TP-Conexiones y Buceo, además se establecen alianzas estratégicas para la construcción, mantenimiento y reparación de equipo marinos en la costa oriental del Lago de Maracaibo, estado Zulia."
        buttonText="Visitar Página Web"
        buttonLink="https://berkenvenezuela.com"
        model={{
          type: 'laptop',
          alt: 'Berken',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
