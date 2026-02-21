import { useEffect, useState } from 'react'

const BREAKING_VIDEO_URL = '/breaking-video.mov'

function BannerContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <>
      <span className="breaking-banner__label">BREAKING:</span>{' '}
      FanDuel has banned Jack Bleiweis from betting on Scottie Scheffler indefinitely. Please{' '}
      <button type="button" className="breaking-banner__link" onClick={onLinkClick}>
        click this link
      </button>{' '}
      to view. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </>
  )
}

export default function BreakingBanner() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!showModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showModal])

  return (
    <>
      <div className="breaking-banner">
        <div className="breaking-banner__scroll">
          <BannerContent onLinkClick={() => setShowModal(true)} />
          <BannerContent onLinkClick={() => setShowModal(true)} />
        </div>
      </div>

      {showModal && (
        <div
          className="breaking-modal"
          onClick={() => setShowModal(false)}
          role="presentation"
        >
          <div className="breaking-modal__content" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="breaking-modal__close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <video
              src={BREAKING_VIDEO_URL}
              controls
              autoPlay
              className="breaking-modal__video"
            />
          </div>
        </div>
      )}
    </>
  )
}
