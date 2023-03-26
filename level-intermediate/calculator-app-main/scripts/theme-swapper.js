const themeSwapper = document.querySelector('.theme-swapper-ball')
const schemeName = 'calc-scheme'

themeSwapper.addEventListener('input', handleSwapp)
function handleSwapp(e) {
    actualScheme = `theme${themeSwapper.value}`
    setScheme(actualScheme)
    localStorage.setItem(schemeName, actualScheme)
}

function getScheme(scheme) {
    if (!scheme) {
        localStorage.setItem(schemeName, 'theme1')
        return 'theme1'
    } else {
        return scheme
    }
}

const theme = {
    theme1: {
        '--main-bg': 'hsl(222, 26%, 31%)',
        '--buttons-bg': 'hsl(223, 31%, 20%)',
        '--screen-bg': 'hsl(224, 36%, 15%)',
        
        // #### Keys
        
        '--key-bg': 'hsl(30, 25%, 89%)',
        '--key-shadow': 'hsl(28, 16%, 65%)',
        '--especial-key-bg': 'hsl(225, 21%, 49%)',
        '--especial-key-shadow': 'hsl(224, 28%, 35%)',
        '--equals-key-bg': 'hsl(6, 63%, 50%)',
        '--equals-key-shadow': 'hsl(6, 70%, 34%)',

        // #### Text
        
        '--white': 'hsl(0, 0%, 100%)',
        '--black': 'hsl(221, 14%, 31%)',
        '--font-color-primary': 'var(--white)',
        '--font-color-secundary': 'var(--black)',
        '--equals-font-color': 'var(--white)'
    },
    theme2: {
        '--main-bg': 'hsl(0, 0%, 90%)',
        '--buttons-bg': 'hsl(0, 5%, 81%)',
        '--screen-bg': 'hsl(0, 0%, 93%)',
        
        // #### Keys
        
        '--key-bg': 'hsl(45, 7%, 89%)',
        '--key-shadow': 'hsl(35, 11%, 61%)',
        '--especial-key-bg': 'hsl(185, 42%, 37%)',
        '--especial-key-shadow': 'hsl(185, 58%, 25%)',
        '--equals-key-bg': 'hsl(25, 98%, 40%)',
        '--equals-key-shadow': 'hsl(25, 99%, 27%)',

        // #### Text
        
        '--white': 'hsl(0, 0%, 100%)',
        '--black': 'hsl(60, 10%, 19%)',
        '--font-color-primary': 'var(--black)',
        '--font-color-secundary': 'var(--black)',
        '--equals-font-color': 'var(--white)'
    },
    theme3: {
        '--main-bg': 'hsl(268, 75%, 9%)',
        '--buttons-bg': 'hsl(268, 71%, 12%)',
        '--screen-bg': 'hsl(268, 71%, 12%)',
        
        // #### Keys
        
        '--key-bg': 'hsl(268, 47%, 21%)',
        '--key-shadow': 'hsl(290, 70%, 36%)',
        '--especial-key-bg': 'hsl(281, 89%, 26%)',
        '--especial-key-shadow': 'hsl(285, 91%, 52%)',
        '--equals-key-bg': 'hsl(176, 100%, 44%)',
        '--equals-key-shadow': 'hsl(177, 92%, 70%)',

        // #### Text
        
        '--white': 'hsl(0, 0%, 100%)',
        '--black': 'hsl(198, 20%, 13%)',
        '--font-color-primary': 'hsl(52, 100%, 62%)',
        '--font-color-secundary': 'hsl(52, 100%, 62%)',
        '--equals-font-color': 'var(--black)'
    }
};

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener('change', e => {
        actualScheme = e.matches ? "theme3" : "theme1";
        localStorage.setItem(schemeName, actualScheme)
        setScheme(actualScheme)
    })


function setScheme(scheme) {
    Object.keys(theme[scheme]).forEach(key => {
        document.documentElement.style.setProperty(
            key, theme[scheme][key]
        )
    })
}

let actualScheme = getScheme(localStorage.getItem(schemeName))
setScheme(actualScheme)
themeSwapper.value = Number(actualScheme.charAt(actualScheme.length - 1))
