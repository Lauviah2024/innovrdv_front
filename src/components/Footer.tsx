import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} InnovRDV - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
  )
}
