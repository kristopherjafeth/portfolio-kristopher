import profileImgLarge from 'assets/profile-large.jpg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hola! ¿Cómo estas?" start={visible} delay={300} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Soy Kristopher, actualmente vivo en Maracaibo y trabajo como desarrollador web, Mis
      proyectos incluyen Diseño Web, Desarrollo de Backend y Frontend. Sentirme cómodo con
      el código me permite crear rápidamente prototipos y validar experiencias. Si está
      interesado en mis servicios, consulte mis redes sociales.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      En mi tiempo libre me gusta diseñar, jugar videojuegos y ajedrez. Siempre estoy
      dispuesto a escuchar sobre nuevos proyectos, así que no dudes en escribirme.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Enviar un mensaje
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Yo"
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
