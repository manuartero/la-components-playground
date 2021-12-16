import React, { FunctionComponent } from 'react';
import PlaylistItem from './playlist-item';

const data = {
    title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x03',
    description:
        'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
    thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/fox_1f98a.png',
    durationInSeconds: 3540,
    progressInSeconds: 0,
};

const PlaylistItemController: FunctionComponent = () => {
    const onPlay = () => {
        console.log('play');
    };
    const onPause = () => {
        console.log('pause');
    };

    return (
        <PlaylistItem
            id='42'
            thumbnail={data.thumbnail}
            title={data.title}
            description={data.description}
            durationInSeconds={data.durationInSeconds}
            isPlaying={false}
            onPlay={onPlay}
            onPause={onPause}
            progressInSeconds={data.progressInSeconds}
        />
    );
};

export default PlaylistItemController;
