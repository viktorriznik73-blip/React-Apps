import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { FiShare2 } from 'react-icons/fi';
import { useState, useEffect} from 'react'
import './App.css'

interface Videos {
  id: number,
  title: string,
  link: string,
 thumbnail: string;
 userLiked?: boolean;   
  userDisliked?: boolean;
  likes?: number,
  dislikes?: number
}
export default function WatchVideos() {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Videos | null>();
  const [text, setText] = useState<string>("");
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null)
const savedVideos = localStorage.getItem('youtube-videos');
const initialVideos = savedVideos ? JSON.parse(savedVideos) : [{ 
    id: 1, 
    title: 'CS50x in Spanish The - End', 
    link: 'https://www.youtube.com/embed/0IjFxHxs88c', 
    thumbnail: 'https://i.ytimg.com/vi/GHZzYAy4NKA/hq720.jpg',
    likes: 12,
    dislikes: 1,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 2, 
    title: 'CS50x in Spanish - Introduction', 
    link: 'https://www.youtube.com/embed/hKpAHgT9VxM', 
    thumbnail: 'https://i.ytimg.com/vi/hKpAHgT9VxM/maxresdefault.jpg',
    likes: 45,
    dislikes: 2,
    userLiked: false,
    userDisliked: false
  }]
  useEffect(() => {
    localStorage.setItem('youtube_videos', JSON.stringify(videos))
  }, [videos])

 const handleLike = () => {
    if (!currentVideo) return;
    
    const updatedVideos = videos.map(video => {
      if (video.id === currentVideo.id) {
        let newLikes = video.likes ?? 0;
        let newDislikes = video.dislikes ?? 0;
        let newLikedState = !video.userLiked;
        let newDislikedState = video.userDisliked;

        if (newLikedState) {
          newLikes += 1;
          if (video.userDisliked) {
            newDislikes -= 1;
            newDislikedState = false;
          }
        } else {
          newLikes -= 1;
        }

        const updated = {
          ...video,
          likes: newLikes,
          dislikes: newDislikes,
          userLiked: newLikedState,
          userDisliked: newDislikedState,
        };
        setCurrentVideo(updated);
        return updated;
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const handleDisLike = () => {
    if (!currentVideo) return;

    const updatedVideos = videos.map(video => {
      if (video.id === currentVideo.id) {
        let newLikes = video.likes ?? 0;
        let newDislikes = video.dislikes ?? 0;
        let newLikedState = video.userLiked;
        let newDislikedState = !video.userDisliked; 

        if (newDislikedState) {
          newDislikes += 1;
          if (video.userLiked) {
            newLikes -= 1;
            newLikedState = false;
          }
        } else {
          newDislikes -= 1;
        }

        const updated = {
          ...video,
          likes: newLikes,
          dislikes: newDislikes,
          userLiked: newLikedState,
          userDisliked: newDislikedState,
        };
        setCurrentVideo(updated);
        return updated;
      }
      return video;
    });
    setVideos(updatedVideos);
  };
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
if (text === null) return;
setText(e.target.value)
  }
  const selectedVideo = (video: any) => {
    setCurrentVideo(video)
  }
  useEffect(() => {

   
setVideos(initialVideos)
setCurrentVideo(initialVideos[0])
  }, [])
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(text.toLowerCase())
  )
  const handleShare = () => {
    if (currentVideo) {
      navigator.clipboard.writeText(currentVideo.link);
      alert('You have copied link!')
    }
  }
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Youtube</h1>
    <input className='inpur' type="text" value={text} onChange={handleTextInput} placeholder='Search Video...' style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}/>
   <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
   {currentVideo ? (
  <div style={{ 
    width: '100%', 
    aspectRatio: '16/9', 
    borderRadius: '8px', 
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url(${currentVideo.thumbnail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
    <iframe 
      src={currentVideo.link} 
      title={currentVideo.title}
      style={{ width: '700px', height: '100%', border: 'none', position: 'relative', zIndex: 2 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen
    />
  </div>
) : (
  <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
    Video
  </div>
)}
    <h2>{currentVideo ? currentVideo.title : "Videos"}</h2>
   <div style={{ display: 'flex', gap: '15px', marginTop: '10px', alignItems: 'center' }}>
  
  <button 
    onClick={handleLike}
    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #ccc', background: '#0F0F0F' }}
  >
    {currentVideo?.userLiked ? <BiSolidLike size={20} color="#FFFFFF" /> : <BiLike size={20} />}
    <span>{currentVideo?.likes}</span>
  </button>

  <button 
    onClick={handleDisLike}
    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #ccc', background: '#0F0F0F' }}
  >
    {currentVideo?.userDisliked ? <BiSolidDislike size={20} color="#FFFFFF" /> : <BiDislike size={20} />}
    <span>{currentVideo?.dislikes}</span>
  </button>

  <button 
    onClick={handleShare}
    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #ccc', background: '#0F0F0F' }}
  >
    <FiShare2 size={20} />
    <span>Share</span>
  </button>

</div>
   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {filteredVideos.map(video => (
        <div key={video.id} 
              onClick={() => selectedVideo(video)} 
              onMouseEnter={() => setHoveredVideoId(video.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '12px', 
                background: currentVideo?.id === video.id ? '#C4302B' : '#fff',
                border: '1px solid #e0e0e0', 
                borderRadius: '8px', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: hoveredVideoId === video.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}>
              
              <div style={{ 
                width: '120px', 
                height: '60px',
                backgroundImage: `url(${video.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                borderRadius: '4px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '12px', 
                color: '#fff' 
              }}>
                {hoveredVideoId !== video.id}
              </div>

              <span style={{ fontWeight: '500', color: 'aliceblue' }}>{video.title}</span>
        </div>
      ))}
    </div>
  </div>
  </div>
  )
}

