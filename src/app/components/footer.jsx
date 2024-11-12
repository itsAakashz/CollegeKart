export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-6">
        <div className="text-center">
          <img src="landing/logo.png" alt="CollegeKart Logo" className="h-10 w-10 mx-auto mb-2" />
          <p>&copy; 2024 CollegeKart, All rights reserved.</p>
        </div>

        <div className="text-center">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            <a href="mailto:techtutez@gmail.com" aria-label="Email" className="hover:opacity-75">
              <img src="landing/mail.png" alt="Email Icon" className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/aakashuuu" target="_blank" aria-label="LinkedIn" className="hover:opacity-75">
              <img src="landing/linkedin.png" alt="LinkedIn Icon" className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/shivam.shah29/" target="_blank" aria-label="Instagram" className="hover:opacity-75">
              <img src="landing/insta.png" alt="Instagram Icon" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}