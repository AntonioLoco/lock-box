export interface app{
    name: string, 
    icon: string
}

export interface category {
    category: string,
    apps: app[]
}

export const categories: category[] = [
    {
        category: "Social Network",
        apps: [
            { name: 'Facebook', icon: 'facebook.png' },
            { name: 'Instagram', icon: 'instagram.png' },
            { name: 'Twitter', icon: 'twitter.png' },
            { name: 'LinkedIn', icon: 'linkedin.png' },
            { name: 'YouTube', icon: 'youtube.png' },
            { name: 'Pinterest', icon: 'pinterest.png' },
            { name: 'Snapchat', icon: 'snapchat.png' },
            { name: 'TikTok', icon: 'tiktok.png' },
            { name: 'Reddit', icon: 'reddit.png' },
            { name: 'Discord', icon: 'discord.png' },
            { name: 'BeReal', icon: 'bereal.png' },
        ]
    },
    {
        category: "Intrattenimento",
        apps: [
            { name: 'Netflix', icon: 'netflix.png' },
            { name: 'Dazn', icon: 'dazn.png' },
            { name: 'Twitch', icon: 'twitch.png' },
            { name: 'Spotify', icon: 'spotify.png' },
            { name: 'Disney+', icon: 'disney.png' },
            { name: 'Itunes', icon: 'itunes.png' },
            { name: 'Prime Video', icon: 'prime_video.png' },
            { name: 'Amazon Music', icon: 'amazon_music.png' },
            { name: 'Rai Play', icon: 'rai_play.png' },
            { name: 'Mediset Infinity', icon: 'mediaset_infinity.png' },
            { name: 'Sky', icon: 'sky.png' },
            { name: 'Viki Rakuten', icon: 'viki.png' },
            { name: 'Paramount+', icon: 'paramount.png' },
            { name: 'Now TV', icon: 'now.png' },
        ]
    },
    {
        category: "Shopping",
        apps: [
            {name: "Shein", icon: "shein.png"},
            {name: "Vinted", icon: "vinted.png"},
            {name: "Amazon", icon: "amazon.png"},
            {name: "Subito", icon: "subito.png"},
            {name: "Zalando", icon: "zalando.png"},
            {name: "About You", icon: "about_you.png"},
            {name: "Sephora", icon: "sephora.png"},
            {name: "Wallapop", icon: "wallapop.png"},
            {name: "Notino", icon: "notino.png"},
            {name: "Asos", icon: "asos.png"},
            {name: "Mediaworld", icon: "mediaworld.png"},
            {name: "Euronics", icon: "euronics.png"},
            {name: "Unieuro", icon: "unieuro.png"},
        ]
    },
    {
        category: "Produttività",
        apps: [ 
            {name: "Gmail", icon: "gmail.png"},
            {name: "Microsoft", icon: "microsoft.png"},
            {name: "Apple", icon: "apple.png"},
            {name: "Libero", icon: "libero.png"},
            {name: "Zoom", icon: "zoom.png"},
            {name: "Trello", icon: "trello.png"},
            {name: "Slack", icon: "slack.png"},
            { name: 'Skype', icon: 'skype.png' },
            {name: "Canva", icon: "canva.png"},
            {name: "GitHub", icon: "gihub.png"},
            {name: "PicsArt", icon: "picsart.png"},
            {name: "Adobe", icon: "adobe.png"},
        ]
    },
    {
        category: "Istruzione",
        apps: [
            {name: "didUp", icon: "didup.png"},
            {name: "18app", icon: "18app.png"},
            {name: "ClasseViva", icon: "classeviva.png"},
            {name: "Udemy", icon: "udemy.png"},
            {name: "MIUR", icon: "miur.png"},
        ]
    },
    {
        category: "Utility",
        apps: [
            {name: "Poste", icon: "poste.png"},
            {name: "INPS", icon: "inps.png"},
            {name: "Enel energia", icon: "enel.png"},
            {name: "Vodafone", icon: "vodafone.png"},
            {name: "Fastweb", icon: "fastweb.png"},
            {name: "Ho", icon: "ho.png"},
            {name: "Nord VPN", icon: "nordvpn.png"},
            {name: "Very Mobile", icon: "very_mobile.png"},
            {name: "My Tim", icon: "tim.png"},
            {name: "Kena Mobile", icon: "kena.png"},
        ]
    },
    {
        category: "Finanza",
        apps: [
            {name: "PostePay", icon: "postepay.png"},
            {name: "Banco Posta", icon: "bancoposta.png"},
            {name: "PayPal", icon: "paypal.png"},
            {name: "Intesa San Paolo", icon: "intesasanpaolo.png"},
            {name: "Unicredit", icon: "unicredit.png"},
            {name: "Satispay", icon: "satispay.png"},
            {name: "Revolout", icon: "revoulut.png"},
            {name: "Generali", icon: "generali.png"},
            {name: "BuddyBank", icon: "buddybank.png"},
            {name: "Banca MPS", icon: "bancaMPS.png"},
            {name: "ING", icon: "ing.png"},
            {name: "Crypto", icon: "crypto.png"},
            {name: "BLN", icon: "bln.png"},
            {name: "YAP", icon: "yap.png"},
            {name: "CoinBase", icon: "coinbase.png"},
            {name: "Sella", icon: "sella.png"},
            {name: "Allianz", icon: "allianz.png"},
            {name: "Skrill", icon: "skrill.png"},
            {name: "HYPE", icon: "hype.png"},
            {name: "Compass", icon: "compass.png"},
        ]
    },
    {
        category: "Viaggi",
        apps: [
            {name: "Booking", icon: "booking.png"},
            {name: "Ryanair", icon: "ryanair.png"},
            {name: "AirBnb", icon: "airbnb.png"},
            {name: "Trenitalia", icon: "trenitalia.png"},
            {name: "Uber", icon: "uber.png"},
            {name: "eDreams", icon: "edreams.png"},
            {name: "ITA Airways", icon: "itaairways.png"},
            {name: "Flix Bus", icon: "flixbus.png"},
            {name: "TripAdvisor", icon: "tripadvisor.png"},
        ]
    },
    {
        category: "Cibi",
        apps: [
            {name: "Just Eat", icon: "justeat.png"},
            {name: "McDonald's", icon: "mcdonalds.png"},
            {name: "Deliveroo", icon: "deliveroo.png"},
            {name: "Burger King", icon: "burgerking.png"},
            {name: "KFC", icon: "kfc.png"},
            {name: "Glovo", icon: "glovo.png"},
        ]
    }, 
    {
        category: "Altro",
        apps: []
    }
]