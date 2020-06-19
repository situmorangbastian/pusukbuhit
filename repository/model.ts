import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts'

class RootModel extends Model {
    static table = 'root'
    static timestamps = true

    static fields = {
        _id: DataTypes.STRING,
        name: DataTypes.STRING,
    }
}

class ChildModel extends Model {
    static table = 'child'
    static timestamps = true

    static fields = {
        _id: DataTypes.STRING,
        name: DataTypes.STRING,
    }
}

export { RootModel, ChildModel }