const mongoose = require('mongoose')

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://root:root@localhost:27017/admin', {
        dbName: 'nodejs',
        // useNewUrlParser: true,         6.0 이상 버젼에서는 기본값으로 설정 되있어서 추가적으로 작성하면 에러가 남
        // useCreateIndes: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    })
}

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
})
mongoose.connection.on('disconnecte', () => {
    console.error('몽고디비 열결이 끊겼습니다. 연결을 재시도 합니다.');
    connect();
})

module.exports = connect;