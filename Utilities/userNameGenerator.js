class UserNameGenerator
{
    constructor()
    {
        this.counter=0;
    }

    generateUsername()
    {
        this.counter++;
        return `user${this.counter}`;
    }
}
 module.exports={UserNameGenerator}