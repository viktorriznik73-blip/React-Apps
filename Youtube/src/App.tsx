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
     title: '50 Seconds on Binary', 
    link: 'https://youtu.be/Kka06ZPJnBA?si=x6EBk9b-XvPuzkvO', 
    thumbnail: 'https://i.ytimg.com/vi/Kka06ZPJnBA/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 2, 
    title: 'CS50x - Introduction', 
    link: 'https://youtu.be/HJP0a6vKvlo?si=AkZUrNGaCdmUZLoC', 
    thumbnail: 'https://i.ytimg.com/vi/HJP0a6vKvlo/hqdefault.jpg?v=6a7b40cf',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 3, 
    title: 'CS50x - Lecture 0 - Scratch', 
    link: 'https://youtu.be/UuIEbpQms8o?si=VbA6zUziCCZ1rw6E', 
    thumbnail: 'https://i.ytimg.com/vi/UuIEbpQms8o/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 4, 
    title: 'CS50x - Lecture 1 - C', 
    link: 'https://youtu.be/SlqjA04_dpk?si=tJS0U7x6_g_UAfP_', 
    thumbnail: 'https://i.ytimg.com/vi/SlqjA04_dpk/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 5, 
    title: 'CS50x - Lecture 2 - Arrays', 
    link: 'https://youtu.be/h5Gc1n8ZuU8?si=aEhiJ10XvciSjy90', 
    thumbnail: 'https://i.ytimg.com/vi/h5Gc1n8ZuU8/sddefault.jpg?v=6a7b413e',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 6, 
    title: 'CS50x - Lecture 3 - Algorithms', 
    link: 'https://youtu.be/6Svu_ae5ebk?si=PME1gOkbewQFO4eZ', 
    thumbnail: 'https://i.ytimg.com/vi/6Svu_ae5ebk/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 7, 
    title: 'CS50x - Lecture 4 - Memory', 
    link: 'https://youtu.be/db0H0U13YsA?si=k4rGbHr5fPLQX1Gh', 
    thumbnail: 'https://i.ytimg.com/vi/db0H0U13YsA/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
   { 
    id: 8, 
    title: 'CS50x - Lecture 5 - Data Structures', 
    link: 'https://youtu.be/PmAI76OGE_E?si=knbM3VnGn5okdSG2', 
    thumbnail: 'https://i.ytimg.com/vi/PmAI76OGE_E/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 9, 
    title: 'CS50x - Lecture 6 - Python', 
    link: 'https://youtu.be/Rl0ludWTLxs?si=-_dTes9sjt7SfSo-', 
    thumbnail: 'https://i.ytimg.com/vi/Rl0ludWTLxs/mqdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 10, 
    title: 'CS50x - Lecture 7 - SQL', 
    link: 'https://youtu.be/oqRU2So6Z2Y?si=0iiDRlUYmQdR1GKF', 
    thumbnail: 'https://i.ytimg.com/vi/oqRU2So6Z2Y/hqdefault.jpg?v=6a7b420f',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 11, 
    title: 'CS50x - Artificial Intelligence', 
    link: 'https://youtu.be/-9bo8HlSxwQ?si=qsK-RbyDgo2gPKkt', 
    thumbnail: 'https://i.ytimg.com/vi/-9bo8HlSxwQ/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 12, 
    title: 'CS50x - Lecture 8 - HTML, CSS, JavaScript', 
    link: 'https://youtu.be/yYst7puZXjw?si=7tmXFQ7EgJdL1qoY', 
    thumbnail: 'https://i.ytimg.com/vi/yYst7puZXjw/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 13, 
    title: 'CS50x - Lecture 9 - Flask', 
    link: 'https://youtu.be/am7POvSZ4GE?si=e9mEkPd_HC_byGVu', 
    thumbnail: 'https://i.ytimg.com/vi/am7POvSZ4GE/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  },
  { 
    id: 14, 
    title: 'CS50x - Lecture 10 - The End', 
    link: 'https://youtu.be/ApQTgFkf8TU?si=0DGmYaKW-WPAoTpV', 
    thumbnail: 'https://i.ytimg.com/vi/ApQTgFkf8TU/maxresdefault.jpg',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false
  }
]
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
  const getEmbedUrl = (url: string) => {
    if(url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
  return (
    <div className="app-container">
      <h1>Youtube</h1>
      
      <input 
        className="search-input" 
        type="text" 
        value={text} 
        onChange={handleTextInput} 
        placeholder="Search Video..." 
      />

      <div className="video-section">
        {currentVideo ? (
          <div 
            className="video-player-wrapper" 
            style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
          >
            <iframe 
              className="video-iframe"
              src={currentVideo ? getEmbedUrl(currentVideo.link) : ''} 
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        ) : (
          <div className="no-video-placeholder">
            Video
          </div>
        )}

        <h2>{currentVideo ? currentVideo.title : "Videos"}</h2>
        
        <div className="actions-container">
          <button onClick={handleLike} className="action-button">
            {currentVideo?.userLiked ? <BiSolidLike size={20} color="#FFFFFF" /> : <BiLike size={20} />}
            <span>{currentVideo?.likes}</span>
          </button>

          <button onClick={handleDisLike} className="action-button">
            {currentVideo?.userDisliked ? <BiSolidDislike size={20} color="#FFFFFF" /> : <BiDislike size={20} />}
            <span>{currentVideo?.dislikes}</span>
          </button>

          <button onClick={handleShare} className="action-button">
            <FiShare2 size={20} />
            <span>Share</span>
          </button>
        </div>

        <div className="video-list">
          {filteredVideos.map(video => (
            <div 
              key={video.id} 
              onClick={() => selectedVideo(video)} 
              onMouseEnter={() => setHoveredVideoId(video.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              className="video-card"
              style={{ 
                background: currentVideo?.id === video.id ? '#C4302B' : '#0f0f0f',
                boxShadow: hoveredVideoId === video.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <div 
                className="video-card-thumbnail"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                {hoveredVideoId !== video.id}
              </div>

              <span className="video-card-title">{video.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

