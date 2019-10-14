module.exports = class Link{
    constructor(title, url, author){
        let absoluteUrl = url;

        if(
            !absoluteUrl.startsWith("http://") &&
            !absoluteUrl.startsWith("https://")
        ){

            absoluteUrl = `http://${absoluteUrl}`;
        }

        this.title = title;
        this.author = author;
        this.url = absoluteUrl;
    }

    toString(){
        return `${this.title} (${this.url}). Author: ${this.author}`;
    }
};
