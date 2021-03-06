import React from 'react';
import './App.css';
import { Playlist, PlaylistItem } from 'components/playlist';
import { PodcastPlayer } from 'components/podcast-player';

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
        thumbnail: '',
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
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x04',
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
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x05',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3540,
        progressInSeconds: 3530,
    },
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x06',
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
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x07',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3540,
        progressInSeconds: 0,
    },
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x08',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3540,
        progressInSeconds: 0,
    },
    {
        title: 'PERDER EL TIEMPO con NADIA DE SANTIAGO | 1x09',
        description:
            'Hablamos con la persona más polémica en redes sociales de España: Nadia de Santiago. \
        La actriz, guionista y directora cuenta cómo convive con las críticas y explica \
        su proceso para crear contenido feminista. \
        La guinda del pastel la ponen Henar Alvarez y las Spice Girls con un fin de fiesta épico',
        thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fox_1f98a.png',
        durationInSeconds: 3540,
        progressInSeconds: 0,
    },
];

const onPlay = () => {
    console.log('play');
};

const onPause = () => {
    console.log('pause');
};

enum FocusElements {
    PODCAST_PLAYER,
    PLAYLIST,
}

function App() {
    const [progress, setProgress] = React.useState(20);
    const intervalRef = React.useRef<number | undefined>(undefined);
    const [focusedElement, setFocusedElement] = React.useState<FocusElements>(FocusElements.PLAYLIST);

    React.useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setProgress((old) => {
                old++;
                old > 99 && window.clearInterval(intervalRef.current);
                return old;
            });
        }, 1000);
    }, []);

    const onLeftPressed = React.useCallback(() => {
        setFocusedElement(FocusElements.PODCAST_PLAYER);
    }, []);

    const onRightPressed = React.useCallback(() => {
        setFocusedElement(FocusElements.PLAYLIST);
    }, []);

    return (
        <div className='App'>
            <PodcastPlayer
                id='my-super-podcast-player'
                title={data[0].title}
                cover={
                    'https://cdn.domestika.org/c_limit,dpr_1.0,f_auto,q_auto,w_820/v1583138995/content-items/003/800/173/%25C3%258Ddolos_E05_4x4-original.jpg?1583138995'
                }
                progressPercent={progress}
                isFocused={focusedElement === FocusElements.PODCAST_PLAYER}
                rightPressed={onRightPressed}
            />
            <Playlist
                focused={focusedElement === FocusElements.PLAYLIST}
                id='my-super-playlist'
                visibleRows={5}
                rowSeparation={16}
            >
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
                        onPlay={onPlay}
                        onPause={onPause}
                        progressInSeconds={item.progressInSeconds}
                        leftPressed={onLeftPressed}
                    />
                ))}
            </Playlist>
        </div>
    );
}

export default App;
