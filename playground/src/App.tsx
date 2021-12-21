import React from 'react';
import './App.css';
import { Playlist, PlaylistItem } from 'components/playlist';

import './style/index.scss';

declare global {
    interface Window {
        SDK: any;
    }
}

const data = [
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x01',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3640,
        progressInSeconds: 200,
    },
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x02',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3541,
        progressInSeconds: 0,
    },
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x03',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3540,
        progressInSeconds: 40,
    },
];

const onPlay = () => {
    console.log('play');
};

const onPause = () => {
    console.log('pause');
};

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Playlist focused id='my-super-playlist'>
                    {data.map((item, index) => (
                        <PlaylistItem
                            id={index.toString()}
                            key={index}
                            type='with-thumbnail'
                            thumbnail={item.thumbnail}
                            title={item.title}
                            description={item.description}
                            durationInSeconds={item.durationInSeconds}
                            isPlaying={false}
                            isFocused={false}
                            onPlay={onPlay}
                            onPause={onPause}
                            progressInSeconds={item.progressInSeconds}
                        />
                    ))}
                </Playlist>
            </header>
        </div>
    );
}

export default App;
