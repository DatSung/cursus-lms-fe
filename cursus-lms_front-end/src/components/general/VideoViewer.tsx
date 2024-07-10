interface IProps {
    videoUrl: string;
}

const VideoViewer = (props: IProps) => {
    return (
        <>
            <iframe width="100%" height={'400px'} src={props.videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
        </>
    );
};

export default VideoViewer;