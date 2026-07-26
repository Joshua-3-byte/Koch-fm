import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const SocialIcons = () => {
  return (
    <div className='flex gap-8'>
      <a 
        href='https://www.facebook.com/kochfmradio' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Facebook'
      >
        <FaFacebook size={24} />
      </a>

      <a 
        href='https://x.com/Kochfmradio?fbclid=IwY2xjawTStu9leHRuA2FlbQIxMABicmlkETE2bzMzZnhpdUM0dk5vT0hmc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnL5p7XI0oxSa5NnWSNNzcjOiqzx676pAJftty_94zTTodFenJFNey3KtCUI_aem_ojJb_cPx0N0b1iNVMAPOqQ' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Twitter'
      >
        <FaXTwitter size={24} />
      </a>

      <a 
        href='https://www.instagram.com/kochfmradio?fbclid=IwY2xjawTStsxleHRuA2FlbQIxMABicmlkETE2bzMzZnhpdUM0dk5vT0hmc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtQhK-NCyke95S7WwpWrUf4NewHr_HcbjRCC__Qo7iRrnK0Q1fldT_he9OBy_aem_BspWPPjeQS04NfnQfyPHRg' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='Instagram'
      >
        <FaInstagram size={24} />
      </a>

      <a 
        href='https://www.tiktok.com/@kochfmradio?fbclid=IwY2xjawTStqdleHRuA2FlbQIxMABicmlkETE2bzMzZnhpdUM0dk5vT0hmc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHqDV9EDiYdxNPUSgeABAK2d2dpS3uDXrwJu6pHgsPqdxuJ_hyFsSIPSsnmII_aem_g7HrxJ20kfvf8XSIps9Tdw' 
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-400 hover:text-red-400 transition-colors duration-300'
        aria-label='TikTok'
      >
        <FaTiktok size={24} />
      </a>
    </div>
  )
}

export default SocialIcons