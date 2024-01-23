import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoInstagram, IoMailOutline } from 'react-icons/io5'

export default function Footer () {
    return (
        <div className=''>
            <span className='block text-center'>Copyright © 2023 - All rights reserved</span>
            <div className='text-2xl flex py-5 justify-center gap-4'>
                <a className="duration-150 transition hover:scale-110 hover:text-primary-100" href='https://github.com/Nealium104'><IoLogoGithub /></a>
                <a className="duration-150 transition hover:scale-110 hover:text-primary-100" href='https://www.linkedin.com/in/neal-grindstaff-894726159/'><IoLogoLinkedin /></a>
                <a className="duration-150 transition hover:scale-110 hover:text-primary-100" href='https://twitter.com/GrindstaffNeal'><IoLogoTwitter /></a>
                <a className="duration-150 transition hover:scale-110 hover:text-primary-100" href='https://www.instagram.com/nealium1221/'><IoLogoInstagram /></a>
                <a className="duration-150 transition hover:scale-110 hover:text-primary-100" href='mailto:neal.grindstaff@gmail.com'><IoMailOutline /></a>
            </div>
        </div>
    )
}