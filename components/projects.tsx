"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Download, Check } from "lucide-react"

export default function PDFDownloadComponent() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const containerRef = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleDownload = () => {
    // Simulate download process
    setIsDownloading(true)
    
    setTimeout(() => {
      setIsDownloading(false)
      setIsDownloaded(true)
      
      // Create a link to download the placeholder
      const link = document.createElement('a')
      link.href = "https://drive.google.com/file/d/1SMwKpvmUt3DQe-1E6vbjSExfNTpKxHcG/view?usp=sharing" // Using the placeholder API
      link.download = "document.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Reset the button state after 2 seconds
      setTimeout(() => {
        setIsDownloaded(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div 
        ref={containerRef}
        className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 opacity-0 transform translate-y-8 transition-all duration-500 border border-gray-800 shadow-white/5"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 bg-gray-800 p-4 rounded-full shadow-lg relative">
            <div className="absolute inset-0 rounded-full bg-white/5 blur-md"></div>
            <FileText className="h-12 w-12 text-white relative z-10" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-white">Company Brochure</h2>
          <p className="text-gray-400 mb-6">Download our official company brochure to learn more about our services and expertise.</p>
          
          <div className="w-full bg-gray-800 h-1 mb-6 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isDownloading ? 'animate-progress' : ''} relative`} 
              style={{ 
                width: isDownloaded ? '100%' : '0%',
                backgroundColor: 'white'
              }}
            >
              <div className="absolute inset-0 bg-white blur-sm"></div>
            </div>
          </div>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-all duration-300 relative overflow-hidden group ${
              isDownloaded 
                ? 'bg-gray-800 text-white' 
                : isDownloading 
                  ? 'bg-gray-800 text-white cursor-wait' 
                  : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <div className={`absolute inset-0 bg-white/20 blur-md transition-opacity ${isDownloading || isDownloaded ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
            
            {isDownloaded ? (
              <>
                <Check className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">Downloaded!</span>
              </>
            ) : isDownloading ? (
              <>
                <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Downloading...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">Download PDF</span>
              </>
            )}
          </button>
          
          <p className="mt-4 text-sm text-gray-500">PDF • 2.4 MB</p>
        </div>
      </div>
    </div>
  )
}
