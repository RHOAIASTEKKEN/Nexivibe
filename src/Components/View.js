import { React, useState, useEffect } from 'react';
import '../Styles/View.css';
import Sectbar from './Sectbar';
import StoryComponent from './Story/StoryConnect';
import VideoPlayer from './Video/VideoPlayer';

function View({ leftSidebarVisible, rightSidebarVisible, user }) {
    const [showVideos, setShowVideos] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 645);

    useEffect(() => {
        // Detectar cambios en el ancho de pantalla
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 645);
        };

        // Agregar el evento resize al cargar el componente
        window.addEventListener('resize', handleResize);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Sectbar
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
            >
                <div className="btn-container-responsive-views flex justify-center mb-5 btn-view ">
                    <button
                        onClick={() => setShowVideos(!showVideos)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        disabled={isWideScreen}
                    >
                        {showVideos ? 'Ver Stories' : 'Ver Videos'}
                    </button>
                </div>
                <div className="w-full">


                    <section className="post-view">
                        {isWideScreen ? (
                            <>
                                <StoryComponent
                                    user={user}
                                />
                                <VideoPlayer rightSidebarVisible={rightSidebarVisible} />
                            </>
                        ) : (
                            <>
                                <StoryComponent
                                    className={showVideos ? 'dispNone' : ''}
                                    user={user}
                                />
                                <VideoPlayer
                                        className={showVideos ? '' : 'dispNone'}
                                        rightSidebarVisible={rightSidebarVisible}
                                />
                            </>
                        )}
                    </section>
                </div>
            </Sectbar>
        </>
    );
}

export default View;
