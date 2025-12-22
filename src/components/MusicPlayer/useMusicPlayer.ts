'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { WEDDING_DATA } from '@/lib/constants';

export function useMusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = WEDDING_DATA.musicPlaylist;
  const currentTrack = playlist[currentTrackIndex];

  const loadTrack = useCallback((index: number) => {
    let newIndex = index;
    if (newIndex < 0) newIndex = playlist.length - 1;
    if (newIndex >= playlist.length) newIndex = 0;
    setCurrentTrackIndex(newIndex);
  }, [playlist.length]);

  const playTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Autoplay prevented:', error));
    }
  }, []);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }, [isPlaying, playTrack, pauseTrack]);

  const nextTrack = useCallback(() => {
    loadTrack(currentTrackIndex + 1);
    if (isPlaying) {
      setTimeout(playTrack, 100);
    }
  }, [currentTrackIndex, isPlaying, loadTrack, playTrack]);

  const prevTrack = useCallback(() => {
    loadTrack(currentTrackIndex - 1);
    if (isPlaying) {
      setTimeout(playTrack, 100);
    }
  }, [currentTrackIndex, isPlaying, loadTrack, playTrack]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(50);
    }
  }, [volume, handleVolumeChange]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Auto-play on mount (with delay to allow user gesture)
  useEffect(() => {
    const timer = setTimeout(() => {
      playTrack();
    }, 1000);

    return () => clearTimeout(timer);
  }, [playTrack]);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return {
    audioRef,
    currentTrack,
    isPlaying,
    volume,
    isCollapsed,
    togglePlayPause,
    nextTrack,
    prevTrack,
    handleVolumeChange,
    toggleMute,
    toggleCollapse,
  };
}
