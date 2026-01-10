const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
                <h3 className="font-bold mb-2">LUXÉ</h3>
                <p>Modern beauty, consciously crafted.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Customer Service</h4>
                <ul className="text-sm space-y-1">
                    <li>Contact Us</li>
                    <li>Shipping</li>
                    <li>Returns</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <ul className="text-sm space-y-1">
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Newsletter</h4>
                <p className="text-sm">Join to get the latest updates and offers.</p>
            </div>
        </div>
        <p className="mt-6 text-center text-sm text-neutral-400">© 2025 LUXÉ. All rights reserved.</p>
    </footer>
  )
}

export default Footer