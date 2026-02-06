const { Client } = require('pg');

async function createTestSpeakers() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_IslrKXAte1p6@ep-calm-glitter-ahz37phz-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require'
  });

  try {
    await client.connect();

    const speakers = [
      {
        fullName: 'Dr. María González',
        bio: 'Profesora titular de Ingeniería de Software con más de 15 años de experiencia en desarrollo de aplicaciones web.',
        photoUrl: null
      },
      {
        fullName: 'Ing. Carlos Rodríguez',
        bio: 'Especialista en ciberseguridad y arquitecturas de sistemas distribuidos. Consultor en empresas Fortune 500.',
        photoUrl: null
      },
      {
        fullName: 'Dra. Ana López',
        bio: 'Investigadora en inteligencia artificial y machine learning. Autora de múltiples publicaciones científicas.',
        photoUrl: null
      },
      {
        fullName: 'MSc. Juan Pérez',
        bio: 'Desarrollador full-stack y experto en tecnologías cloud. Instructor certificado en AWS y Google Cloud.',
        photoUrl: null
      },
      {
        fullName: 'Lic. Laura Martínez',
        bio: 'Especialista en UX/UI design y experiencia de usuario. Ha trabajado en productos digitales para startups y grandes corporaciones.',
        photoUrl: null
      }
    ];

    for (const speaker of speakers) {
      // Verificar si el speaker ya existe
      const existing = await client.query(
        'SELECT id FROM speakers WHERE full_name = $1',
        [speaker.fullName]
      );

      if (existing.rows.length === 0) {
        await client.query(
          'INSERT INTO speakers (full_name, bio, photo_url) VALUES ($1, $2, $3)',
          [speaker.fullName, speaker.bio, speaker.photoUrl]
        );
        console.log(`Ponente creado: ${speaker.fullName}`);
      } else {
        console.log(`Ponente ya existe: ${speaker.fullName}`);
      }
    }

    console.log('\nPonentes de prueba creados exitosamente!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

createTestSpeakers();