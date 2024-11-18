import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Blog.css';

function Blog() {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: 'Mantenimiento Preventivo de PCs',
      description: 'El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir posibles daños causados por uso o desgaste,<br/> a diferencia del mantenimiento correctivo que repara aquellos que dejan de funcionar o están dañados.',
      media: [
        { type: 'image', src: '/image/mantenimiento.jpg', alt: 'PC mantenimiento' },
        { type: 'video', src: '/videos/mantenimiento.mp4', alt: 'Video de mantenimiento' }
      ]
    },
    {
      title: 'Sistemas Operativos',
      description: 'Explora los diferentes sistemas operativos y aprende cómo elegir el adecuado para tus necesidades.<br/> Descubre sus ventajas, características y usos.',
      media: [
        { type: 'image', src: '/image/sistemao-video.png', alt: 'Sistema operativo' },
        { type: 'video', src: '/videos/sistema operativo.mp4', alt: 'Video de Sistema Operativo' }
      ]
    },
  ];

  // Función para volver al inicio
  const handleBack = () => {
    navigate('/home');  // Redirige al usuario a la página de inicio
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog de Tecnología</h1>
      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-post">
            <h2>{post.title}</h2>
            {/* Renderiza la descripción como HTML */}
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
            <div className="media-scroll-container">
              {post.media.map((item, idx) => (
                item.type === 'image' ? (
                  <div key={idx} className="media-item">
                    <img src={item.src} alt={item.alt} className="media-image" />
                    <a href={item.src} download className="download-link">Descargar Imagen</a>
                  </div>
                ) : (
                  <div key={idx} className="media-item">
                    <video controls className="media-video">
                      <source src={item.src} type="video/mp4" />
                      Tu navegador no soporta el formato de video.
                    </video>
                    <a href={item.src} download className="download-link">Descargar Video</a>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleBack}>
        Volver al Inicio
      </button>
    </div>
  );
}

export default Blog;
