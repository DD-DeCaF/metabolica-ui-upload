export class DecafAPIProvider {
    host = 'http://localhost:7000';
//    host = process.env.UPLOAD_API;

    $get() {
        return this.host;
    }
}
