import * as path from 'path'
import* as webpack from 'webpack'

const config: webpack.Configuration = {
    mode: 'production',
    entry: './srcts/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist_ts'),
        filename: 'ts.bundle.js'
    }
}

export default config