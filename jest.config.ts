import type {Config} from '@jest/types';

const config:Config.InitialOptions = {
    preset:'ts-jest',
    testEnvironment:'node',
    roots:['<rootDir>/tests'],// we are telling that we're going to start from the root directory and the move to a directory named test we'r going to create it later 
    testMatch:"**/*.test.ts", // the file that will apply the test are any file that ends with test.ts inside the tests directory 
    verbose:true,
    collectCoverage:true,
    collectCoverageFrom:["src/**/*.ts"],// the file that we want to apply the tests on 
    coverageThreshold:{
        global:{
            functions:85,
            statements:75,     
        }
    }
}
export default config;